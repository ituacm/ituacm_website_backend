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
  Select,
  Switch,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type PostCreate, PostsService, GroupsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddPostProps {
  isOpen: boolean
  onClose: () => void
}

function getGroupsQueryOptions() {
  return {
    queryFn: () =>
      GroupsService.readGroups(),
    queryKey: ["groups"],
  }
}

const AddPost = ({ isOpen, onClose }: AddPostProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()

  // Fetch groups using useQuery
  const { data: groupsData, isLoading: isGroupsLoading } = useQuery({...getGroupsQueryOptions()})

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: "",
      is_visible: true,
      application_link: "",
      group_id: undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: PostCreate) =>
      PostsService.createPost({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Post created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const onSubmit: SubmitHandler<PostCreate> = (data) => {
    mutation.mutate(data);
  }

  const isVisible = watch("is_visible") ?? true

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
          <ModalHeader>Add Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Title */}
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                {...register("title", {
                  required: "Title is required.",
                })}
                placeholder="Title"
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

            {/* Group Selection */}
            <FormControl mt={4} isRequired isInvalid={!!errors.group_id}>
              <FormLabel htmlFor="group_id">Group</FormLabel>
              <Select
                id="group_id"
                placeholder="Select group"
                {...register("group_id", {
                  required: "Group is required.",
                  valueAsNumber: true,
                })}
                isDisabled={isGroupsLoading}
              >
                {groupsData?.groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
              {errors.group_id && (
                <FormErrorMessage>{errors.group_id.message}</FormErrorMessage>
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
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddPost
