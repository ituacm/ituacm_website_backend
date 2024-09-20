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
  VStack,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { LecturesService } from "../../client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCustomToast from "../../hooks/useCustomToast";
import { handleError } from "../../utils";
import { type ApiError, type LecturesCreate } from "../../client"

interface AddCourseProps {
  isOpen: boolean
  onClose: () => void
}
const AddCourse = ({ isOpen, onClose }: AddCourseProps) => {
  const queryClient = useQueryClient();
  const showToast = useCustomToast();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LecturesCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      post: {
        title: "",
        description: "",
        content: "",
        image: "",
        is_visible: true,
        application_link: "",
        group_id: undefined,
      },
      lectures: [
        { title: "", start: "", end: "", location: "", is_visible: true },
      ],
    },
  });

  // Manage dynamic fields for lectures
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lectures",
  });

  const mutation = useMutation({
    mutationFn: (data: LecturesCreate) =>
      LecturesService.createLectures({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Course created successfully.", "success");
      reset();
      onClose();
    },
    onError: (error: ApiError) => {
      handleError(error, showToast);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const onSubmit = (data: LecturesCreate) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Post Section */}
              <FormControl isRequired isInvalid={!!errors.post?.title}>
                <FormLabel>Course Title</FormLabel>
                <Input
                  {...register("post.title", { required: "Title is required" })}
                  placeholder="Course Title"
                />
                {errors.post?.title && (
                  <FormErrorMessage>
                    {errors.post.title.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  {...register("post.description")}
                  placeholder="Description"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input {...register("post.content")} placeholder="Content" />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input {...register("post.image")} placeholder="Image URL" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Application Link</FormLabel>
                <Input
                  {...register("post.application_link")} placeholder="Application Link"
                />
                {errors.post?.application_link && (
                  <FormErrorMessage>
                    {errors.post.application_link.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Is Visible</FormLabel>
                <Switch {...register("post.is_visible")} defaultChecked />
              </FormControl>

              {/* Lectures Section */}
              {fields.map((field, index) => (
                <VStack key={field.id} spacing={4} align="stretch">
                  <FormControl
                    isRequired
                    isInvalid={!!errors.lectures?.[index]?.title}
                  >
                    <FormLabel>Lecture {index + 1} Title</FormLabel>
                    <Input
                      {...register(`lectures.${index}.title`, {
                        required: "Lecture title is required",
                      })}
                      placeholder="Lecture Title"
                    />
                    {errors.lectures?.[index]?.title && (
                      <FormErrorMessage>
                        {errors.lectures?.[index]?.title?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Start Time</FormLabel>
                    <Input
                      type="datetime-local"
                      {...register(`lectures.${index}.start`, {
                        required: "Start time is required",
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>End Time</FormLabel>
                    <Input
                      type="datetime-local"
                      {...register(`lectures.${index}.end`, {
                        required: "End time is required",
                      })}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      {...register(`lectures.${index}.location`, {
                        required: "Location is required",
                      })}
                      placeholder="Location"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Is Visible</FormLabel>
                    <Switch
                      {...register(`lectures.${index}.is_visible`)}
                      defaultChecked
                    />
                  </FormControl>

                  <Button onClick={() => remove(index)} colorScheme="red">
                    Remove Lecture
                  </Button>
                </VStack>
              ))}

              <Button
                onClick={() =>
                  append({
                    title: "",
                    start: "",
                    end: "",
                    location: "",
                    is_visible: true,
                  })
                }
              >
                Add Lecture
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
              Save Course
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCourse;
