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

import { type UserCreate, UsersService } from "../../client"
import type { ApiError } from "../../client/core/ApiError"
import useCustomToast from "../../hooks/useCustomToast"
import { emailPattern, handleError } from "../../utils"

interface AddUserProps {
  isOpen: boolean
  onClose: () => void
}

interface UserCreateForm extends UserCreate {
  confirm_password: string
}

const AddUser = ({ isOpen, onClose }: AddUserProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      photo_url: "",
      role: "",
      department: "",
      github_url: "",
      linked_in_url: "",
      is_superuser: false,
      is_active: true,
      is_public: false,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: UserCreate) =>
      UsersService.createUser({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "User created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit: SubmitHandler<UserCreateForm> = (data) => {
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
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Email */}
            <FormControl isRequired isInvalid={!!errors.email}>
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
            <FormControl mt={4} isRequired isInvalid={!!errors.full_name}>
              <FormLabel htmlFor="full_name">Full name</FormLabel>
              <Input
                id="full_name"
                {...register("full_name", { required: "Full name is required" })}
                placeholder="Full name"
                type="text"
              />
              {errors.full_name && (
                <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Role */}
            <FormControl mt={4} isRequired isInvalid={!!errors.role}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Input
                id="role"
                {...register("role", { required: "Role is required" })}
                placeholder="Role"
                type="text"
              />
              {errors.role && (
                <FormErrorMessage>{errors.role.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Department */}
            <FormControl mt={4} isRequired isInvalid={!!errors.department}>
              <FormLabel htmlFor="department">Department</FormLabel>
              <Input
                id="department"
                {...register("department", {
                  required: "Department is required",
                })}
                placeholder="Department"
                type="text"
              />
              {errors.department && (
                <FormErrorMessage>{errors.department.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* Photo URL */}
            <FormControl mt={4} isInvalid={!!errors.photo_url}>
              <FormLabel htmlFor="photo_url">Photo URL</FormLabel>
              <Input
                id="photo_url"
                {...register("photo_url")}
                placeholder="https://example.com/photo.jpg"
                type="url"
              />
              {errors.photo_url && (
                <FormErrorMessage>{errors.photo_url.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* GitHub URL */}
            <FormControl mt={4} isInvalid={!!errors.github_url}>
              <FormLabel htmlFor="github_url">GitHub URL</FormLabel>
              <Input
                id="github_url"
                {...register("github_url")}
                placeholder="https://github.com/username"
                type="url"
              />
              {errors.github_url && (
                <FormErrorMessage>{errors.github_url.message}</FormErrorMessage>
              )}
            </FormControl>

            {/* LinkedIn URL */}
            <FormControl mt={4} isInvalid={!!errors.linked_in_url}>
              <FormLabel htmlFor="linked_in_url">LinkedIn URL</FormLabel>
              <Input
                id="linked_in_url"
                {...register("linked_in_url")}
                placeholder="https://linkedin.com/in/username"
                type="url"
              />
              {errors.linked_in_url && (
                <FormErrorMessage>
                  {errors.linked_in_url.message}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Password */}
            <FormControl mt={4} isRequired isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
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
            <FormControl
              mt={4}
              isRequired
              isInvalid={!!errors.confirm_password}
            >
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <Input
                id="confirm_password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
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

            {/* Is Public */}
            <FormControl mt={4}>
              <Checkbox {...register("is_public")} colorScheme="teal">
                Is public profile?
              </Checkbox>
            </FormControl>

            {/* Is Superuser and Is Active */}
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

export default AddUser
