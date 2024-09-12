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
  type EventPublic,
  type EventUpdate,
  EventsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface EditEventProps {
  event: EventPublic
  isOpen: boolean
  onClose: () => void
}

const EditEvent = ({ event, isOpen, onClose }: EditEventProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<EventUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: event,
  })

  const mutation = useMutation({
    mutationFn: (data: EventUpdate) =>
      EventsService.updateEvent({ id: event.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Event updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
    },
  })

  const onSubmit: SubmitHandler<EventUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
  }

  const isVisible = watch("is_visible") ?? true;

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
          <ModalHeader>Edit Event</ModalHeader>
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

            {/* Description */}
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                {...register("description")}
                placeholder="Description"
                type="text"
              />
            </FormControl>

            {/* Content */}
            <FormControl mt={4}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Input
                id="content"
                {...register("content")}
                placeholder="Content"
                type="text"
              />
            </FormControl>

            {/* Image */}
            <FormControl mt={4}>
              <FormLabel htmlFor="image">Image URL</FormLabel>
              <Input
                id="image"
                {...register("image")}
                placeholder="Image URL"
                type="text"
              />
            </FormControl>

            {/* Location */}
            <FormControl mt={4}>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                {...register("location")}
                placeholder="Location"
                type="text"
              />
            </FormControl>

            {/* Start Date */}
            <FormControl mt={4} isInvalid={!!errors.start}>
              <FormLabel htmlFor="start">Start Date and Time</FormLabel>
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

            {/* End Date */}
            <FormControl mt={4} isInvalid={!!errors.end}>
              <FormLabel htmlFor="end">End Date and Time</FormLabel>
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

            {/* Application Link */}
            <FormControl mt={4}>
              <FormLabel htmlFor="image">Application Link</FormLabel>
              <Input
                id="application_link"
                {...register("application_link")}
                placeholder="Application Link"
                type="text"
              />
            </FormControl>

            {/* Visibility */}
            <FormControl mt={4}>
              <FormLabel htmlFor="is_visible">Is Visible</FormLabel>
              <Switch
                id="is_visible"
                {...register("is_visible")}
                isChecked={isVisible}
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
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditEvent
