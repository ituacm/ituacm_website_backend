import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
  } from "@chakra-ui/react"
  import { useMutation, useQueryClient } from "@tanstack/react-query"
  import { type SubmitHandler, useForm } from "react-hook-form"
  
  import {
    type ApiError,
    type LecturePublic,
    type LectureUpdate,
    LecturesService,
  } from "../../client"
  import useCustomToast from "../../hooks/useCustomToast"
  import { handleError } from "../../utils"
  
  interface EditLectureProps {
    lecture: LecturePublic
    isOpen: boolean
    onClose: () => void
  }
  
  const EditLecture = ({ lecture, isOpen, onClose }: EditLectureProps) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { isSubmitting, errors, isDirty },
    } = useForm<LectureUpdate>({
      mode: "onBlur",
      criteriaMode: "all",
      defaultValues: lecture,
    })
  
    const mutation = useMutation({
      mutationFn: (data: LectureUpdate) =>
        LecturesService.updateLecture({ id: lecture.id, requestBody: data }),
      onSuccess: () => {
        showToast("Success!", "Lecture updated successfully.", "success")
        onClose()
      },
      onError: (err: ApiError) => {
        handleError(err, showToast)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["lectures"] })
      },
    })
  
    const onSubmit: SubmitHandler<LectureUpdate> = async (data) => {
      mutation.mutate(data)
    }
  
    
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "sm", md: "md" }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Lecture</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {/* Title */}
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  type="text"
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* Start */}
              <FormControl isInvalid={!!errors.start} mt={4}>
                <FormLabel htmlFor="start">Start</FormLabel>
                <Input
                  id="start"
                  {...register("start", {
                    required: "Start date is required",
                  })}
                  type="datetime-local"
                />
                {errors.start && (
                  <FormErrorMessage>{errors.start.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* End */}
              <FormControl isInvalid={!!errors.end} mt={4}>
                <FormLabel htmlFor="end">End</FormLabel>
                <Input
                  id="end"
                  {...register("end", {
                    required: "End date is required",
                  })}
                  type="datetime-local"
                />
                {errors.end && (
                  <FormErrorMessage>{errors.end.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* Location */}
              <FormControl isInvalid={!!errors.location} mt={4}>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  type="text"
                />
                {errors.location && (
                  <FormErrorMessage>{errors.location.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* Visibility */}
              <FormControl mt={4}>
                <FormLabel htmlFor="is_visible">Is Visible</FormLabel>
                <Switch
                  id="is_visible"
                  {...register("is_visible")}
                  isChecked={!!watch("is_visible")}  // Coerce null/undefined to false
                />
              </FormControl>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button
                variant="primary"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isDirty} // Disable if no changes
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

    )
  }
  
  export default EditLecture
  