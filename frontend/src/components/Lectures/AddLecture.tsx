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
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  type ApiError,
  LectureCreate,
  LecturesService,
  PostPublic,
} from "../../client";
import useCustomToast from "../../hooks/useCustomToast";
import { handleError } from "../../utils";

interface AddLectureProps {
  post: PostPublic;
  isOpen: boolean;
  onClose: () => void;
}

const AddLecture = ({ post, isOpen, onClose }: AddLectureProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<LectureCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      location: "",
      is_visible: true,
      post_id: post.id
    },
  });

  const mutation = useMutation({
    mutationFn: (data: LectureCreate) =>
      LecturesService.createLecture({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Lecture created successfully.", "success");
      reset();
      onClose();
    },
    onError: (err: ApiError) => {
      handleError(err, showToast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
  });

  const onSubmit: SubmitHandler<LectureCreate> = (data) => {
    mutation.mutate(data);
  };

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
          <ModalHeader>Create Lecture</ModalHeader>
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
                isChecked={!!watch("is_visible")} // Coerce null/undefined to false
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLecture;
