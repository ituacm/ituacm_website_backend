import {
  Button,
  Checkbox,
  Flex,
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
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UserPublic,
  type UserUpdate,
  UsersService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern, handleError } from "../../utils"

interface EditUserProps {
  user: UserPublic
  isOpen: boolean
  onClose: () => void
}

interface UserUpdateForm extends UserUpdate {
  confirm_password: string
}

const EditUser = ({ user, isOpen, onClose }: EditUserProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: user,
  })

  const mutation = useMutation({
    mutationFn: (data: UserUpdateForm) =>
      UsersService.updateUser({ userId: user.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "User updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
    if (data.password === "") {
      data.password = undefined
    }
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Email */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: emailPattern,
                })}
                placeholder="Email"
                type="email"
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Full name */}
            <FormControl mt={4}>
              <FormLabel htmlFor="full_name">Full name</FormLabel>
              <Input
                id="full_name"
                {...register("full_name", { required: "Full name is required" })}
                type="text"
              />
            </FormControl>

            {/* Role */}
            <FormControl mt={4}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Input
                id="role"
                {...register("role", { required: "Role is required" })}
                type="text"
              />
            </FormControl>

            {/* Department */}
            <FormControl mt={4}>
              <FormLabel htmlFor="department">Department</FormLabel>
              <Input
                id="department"
                {...register("department", {
                  required: "Department is required",
                })}
                type="text"
              />
            </FormControl>

            {/* GitHub URL */}
            <FormControl mt={4}>
              <FormLabel htmlFor="github_url">GitHub URL</FormLabel>
              <Input
                id="github_url"
                {...register("github_url")}
                placeholder="https://github.com/username"
                type="url"
              />
            </FormControl>

            {/* LinkedIn URL */}
            <FormControl mt={4}>
              <FormLabel htmlFor="linked_in_url">LinkedIn URL</FormLabel>
              <Input
                id="linked_in_url"
                {...register("linked_in_url")}
                placeholder="https://linkedin.com/in/username"
                type="url"
              />
            </FormControl>

            {/* Profile Photo URL */}
            <FormControl mt={4}>
              <FormLabel htmlFor="photo_url">Profile Photo URL</FormLabel>
              <Input
                id="photo_url"
                {...register("photo_url", { required: "Photo URL is required" })}
                placeholder="https://example.com/photo.jpg"
                type="url"
              />
            </FormControl>

            {/* Password */}
            <FormControl mt={4} isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Set Password</FormLabel>
              <Input
                id="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
                type="password"
              />
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl mt={4} isInvalid={!!errors.confirm_password}>
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <Input
                id="confirm_password"
                {...register("confirm_password", {
                  validate: (value) =>
                    value === getValues().password ||
                    "The passwords do not match",
                })}
                placeholder="Confirm Password"
                type="password"
              />
              {errors.confirm_password && (
                <FormErrorMessage>
                  {errors.confirm_password.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Public Profile */}
            <FormControl mt={4}>
              <Checkbox {...register("is_public")} colorScheme="teal">
                Is public profile?
              </Checkbox>
            </FormControl>

            {/* Superuser and Active */}
            <Flex mt={4}>
              <FormControl>
                <Checkbox {...register("is_superuser")} colorScheme="teal">
                  Is superuser?
                </Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox {...register("is_active")} colorScheme="teal">
                  Is active?
                </Checkbox>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
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

export default EditUser
