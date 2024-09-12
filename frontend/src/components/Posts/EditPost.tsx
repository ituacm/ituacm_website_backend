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

import {
  type ApiError,
  type PostPublic,
  type PostUpdate,
  PostsService,
  GroupsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface EditPostProps {
  post: PostPublic
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

const EditPost = ({ post, isOpen, onClose }: EditPostProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()

  // Fetch groups using useQuery
  const { data: groupsData, isLoading: isGroupsLoading } = useQuery({...getGroupsQueryOptions()})

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<PostUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: post,
  })

  const mutation = useMutation({
    mutationFn: (data: PostUpdate) =>
      PostsService.updatePost({ id: post.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Post updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })

  const onSubmit: SubmitHandler<PostUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>Edit Post</ModalHeader>
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
  )
}

export default EditPost
