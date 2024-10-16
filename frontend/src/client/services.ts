import type { CancelablePromise } from "./core/CancelablePromise"
import { OpenAPI } from "./core/OpenAPI"
import { request as __request } from "./core/request"

import type {
  Body_login_login_access_token,
  Message,
  NewPassword,
  Token,
  UserPublic,
  UpdatePassword,
  UserCreate,
  UsersPublic,
  UserUpdate,
  UserUpdateMe,
  Post,
  PostCreate,
  PostPublic,
  PostsPublic,
  PostUpdate,
  Event,
  EventCreate,
  EventPublic,
  EventsPublic,
  EventUpdate,
  Lecture,
  LectureCreate,
  LecturePublic,
  Lectures,
  LecturesCreate,
  LecturesPublic,
  LectureUpdate,
  Group,
  GroupBase,
  GroupPublic,
  GroupsPublic,
  ContactForm,
  ContactFormBase,
} from "./models"

export type TDataLoginAccessToken = {
  formData: Body_login_login_access_token
}
export type TDataRecoverPassword = {
  email: string
}
export type TDataResetPassword = {
  requestBody: NewPassword
}
export type TDataRecoverPasswordHtmlContent = {
  email: string
}

export class LoginService {
  /**
   * Login Access Token
   * OAuth2 compatible token login, get an access token for future requests
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static loginAccessToken(
    data: TDataLoginAccessToken,
  ): CancelablePromise<Token> {
    const { formData } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/access-token",
      formData: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Test Token
   * Test access token
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static testToken(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/login/test-token",
    })
  }

  /**
   * Recover Password
   * Password Recovery
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static recoverPassword(
    data: TDataRecoverPassword,
  ): CancelablePromise<Message> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Reset Password
   * Reset password
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static resetPassword(
    data: TDataResetPassword,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/reset-password/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Recover Password Html Content
   * HTML Content for Password Recovery
   * @returns string Successful Response
   * @throws ApiError
   */
  public static recoverPasswordHtmlContent(
    data: TDataRecoverPasswordHtmlContent,
  ): CancelablePromise<string> {
    const { email } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/password-recovery-html-content/{email}",
      path: {
        email,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadUsers = {
  limit?: number
  skip?: number
}
export type TDataCreateUser = {
  requestBody: UserCreate
}
export type TDataUpdateUserMe = {
  requestBody: UserUpdateMe
}
export type TDataUpdatePasswordMe = {
  requestBody: UpdatePassword
}
export type TDataReadUserById = {
  userId: string
}
export type TDataUpdateUser = {
  requestBody: UserUpdate
  userId: string
}
export type TDataDeleteUser = {
  userId: string
}

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @returns UsersPublic Successful Response
   * @throws ApiError
   */
  public static readUsers(
    data: TDataReadUsers = {},
  ): CancelablePromise<UsersPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create User
   * Create new user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static createUser(
    data: TDataCreateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User Me
   * Get current user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserMe(): CancelablePromise<UserPublic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Delete User Me
   * Delete own user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUserMe(): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/me",
    })
  }

  /**
   * Update User Me
   * Update own user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUserMe(
    data: TDataUpdateUserMe,
  ): CancelablePromise<UserPublic> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Password Me
   * Update own password.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static updatePasswordMe(
    data: TDataUpdatePasswordMe,
  ): CancelablePromise<Message> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/me/password",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read User By Id
   * Get a specific user by id.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static readUserById(
    data: TDataReadUserById,
  ): CancelablePromise<UserPublic> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update User
   * Update a user.
   * @returns UserPublic Successful Response
   * @throws ApiError
   */
  public static updateUser(
    data: TDataUpdateUser,
  ): CancelablePromise<UserPublic> {
    const { requestBody, userId } = data
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete User
   * Delete a user.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(data: TDataDeleteUser): CancelablePromise<Message> {
    const { userId } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/{user_id}",
      path: {
        user_id: userId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataTestEmail = {
  emailTo: string
}

export class UtilsService {
  /**
   * Test Email
   * Test emails.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static testEmail(data: TDataTestEmail): CancelablePromise<Message> {
    const { emailTo } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/utils/test-email/",
      query: {
        email_to: emailTo,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadPosts = {
  group?: number
  limit?: number
  skip?: number
}
export type TDataCreatePost = {
  requestBody: PostCreate
}
export type TDataReadPost = {
  id: number
}
export type TDataUpdatePost = {
  id: number
  requestBody: PostUpdate
}
export type TDataDeletePost = {
  id: number
}

export class PostsService {
  /**
   * Read Posts
   * Retrieve posts.
   * @returns PostsPublic Successful Response
   * @throws ApiError
   */
  public static readPosts(
    data: TDataReadPosts = {},
  ): CancelablePromise<PostsPublic> {
    const { group = 1, limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/posts/",
      query: {
        group,
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Post
   * Create new post.
   * @returns Post Successful Response
   * @throws ApiError
   */
  public static createPost(data: TDataCreatePost): CancelablePromise<Post> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/posts/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Post
   * Get post by ID.
   * @returns PostPublic Successful Response
   * @throws ApiError
   */
  public static readPost(data: TDataReadPost): CancelablePromise<PostPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/posts/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Post
   * Update a post.
   * @returns Post Successful Response
   * @throws ApiError
   */
  public static updatePost(data: TDataUpdatePost): CancelablePromise<Post> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/posts/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Post
   * Delete a post.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deletePost(data: TDataDeletePost): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/posts/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadEvents = {
  limit?: number
  skip?: number
}
export type TDataCreateEvent = {
  requestBody: EventCreate
}
export type TDataReadEvent = {
  id: number
}
export type TDataUpdateEvent = {
  id: number
  requestBody: EventUpdate
}
export type TDataDeleteEvent = {
  id: number
}

export class EventsService {
  /**
   * Read Events
   * Retrieve events.
   * @returns EventsPublic Successful Response
   * @throws ApiError
   */
  public static readEvents(
    data: TDataReadEvents = {},
  ): CancelablePromise<EventsPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/events/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Event
   * Create new event.
   * @returns Event Successful Response
   * @throws ApiError
   */
  public static createEvent(data: TDataCreateEvent): CancelablePromise<Event> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/events/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Event
   * Get event by ID.
   * @returns EventPublic Successful Response
   * @throws ApiError
   */
  public static readEvent(
    data: TDataReadEvent,
  ): CancelablePromise<EventPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/events/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Event
   * Update an event.
   * @returns Event Successful Response
   * @throws ApiError
   */
  public static updateEvent(data: TDataUpdateEvent): CancelablePromise<Event> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/events/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Event
   * Delete an event.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteEvent(
    data: TDataDeleteEvent,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/events/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataReadLectures = {
  limit?: number
  skip?: number
}
export type TDataCreateLecture = {
  requestBody: LectureCreate
}
export type TDataReadLecture = {
  id: number
}
export type TDataUpdateLecture = {
  id: number
  requestBody: LectureUpdate
}
export type TDataDeleteLecture = {
  id: number
}
export type TDataCreateLectures = {
  requestBody: LecturesCreate
}

export class LecturesService {
  /**
   * Read Lectures
   * Retrieve lectures.
   * @returns LecturesPublic Successful Response
   * @throws ApiError
   */
  public static readLectures(
    data: TDataReadLectures = {},
  ): CancelablePromise<LecturesPublic> {
    const { limit = 100, skip = 0 } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/lectures/",
      query: {
        skip,
        limit,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Lecture
   * Creates a single lecture
   * @returns Lecture Successful Response
   * @throws ApiError
   */
  public static createLecture(
    data: TDataCreateLecture,
  ): CancelablePromise<Lecture> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/lectures/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Lecture
   * Get lecture by ID.
   * @returns LecturePublic Successful Response
   * @throws ApiError
   */
  public static readLecture(
    data: TDataReadLecture,
  ): CancelablePromise<LecturePublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/lectures/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Lecture
   * Update a lecture.
   * @returns Lecture Successful Response
   * @throws ApiError
   */
  public static updateLecture(
    data: TDataUpdateLecture,
  ): CancelablePromise<Lecture> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/lectures/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Lecture
   * Delete a lecture.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteLecture(
    data: TDataDeleteLecture,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/lectures/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Create Lectures
   * Creates new lectures with a post.
   * @returns Lectures Successful Response
   * @throws ApiError
   */
  public static createLectures(
    data: TDataCreateLectures,
  ): CancelablePromise<Lectures> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/lectures/multiple/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataCreateGroup = {
  requestBody: GroupBase
}
export type TDataReadGroup = {
  id: number
}
export type TDataUpdateGroup = {
  id: number
  requestBody: GroupBase
}
export type TDataDeleteGroup = {
  id: number
}

export class GroupsService {
  /**
   * Read Groups
   * Retrieve groups.
   * @returns GroupsPublic Successful Response
   * @throws ApiError
   */
  public static readGroups(): CancelablePromise<GroupsPublic> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/groups/",
    })
  }

  /**
   * Create Group
   * Create new group.
   * @returns Group Successful Response
   * @throws ApiError
   */
  public static createGroup(data: TDataCreateGroup): CancelablePromise<Group> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/groups/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Read Group
   * Get group by ID.
   * @returns GroupPublic Successful Response
   * @throws ApiError
   */
  public static readGroup(
    data: TDataReadGroup,
  ): CancelablePromise<GroupPublic> {
    const { id } = data
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/groups/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Update Group
   * Update a group.
   * @returns Group Successful Response
   * @throws ApiError
   */
  public static updateGroup(data: TDataUpdateGroup): CancelablePromise<Group> {
    const { id, requestBody } = data
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/groups/{id}",
      path: {
        id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Delete Group
   * Delete a group.
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteGroup(
    data: TDataDeleteGroup,
  ): CancelablePromise<Message> {
    const { id } = data
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/groups/{id}",
      path: {
        id,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}

export type TDataContact = {
  requestBody: ContactFormBase
}

export class ContactService {
  /**
   * Contact
   * Send a mail with the contact request.
   *
   * Args:
   * contact_form_in (ContactFormBase)
   * @returns ContactForm Successful Response
   * @throws ApiError
   */
  public static contact(data: TDataContact): CancelablePromise<ContactForm> {
    const { requestBody } = data
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/contact/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
