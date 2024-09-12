export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type Event = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  start: string
  end: string
  location: string
  id?: number | null
  created_at?: string
  created_by: string
  last_updated?: string
  updated_by: string
}

export type EventCreate = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  start: string
  end: string
  location: string
}

export type EventPublic = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  start: string
  end: string
  location: string
  id: number
}

export type EventUpdate = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  start: string
  end: string
  location: string
}

export type EventsPublic = {
  events: Array<EventPublic>
  count: number
}

export type Group = {
  name: string
  description?: string | null
  id?: number | null
}

export type GroupBase = {
  name: string
  description?: string | null
}

export type GroupPublic = {
  name: string
  description?: string | null
  id: number
}

export type GroupsPublic = {
  groups: Array<GroupPublic>
  count?: number
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type Lecture = {
  title: string
  start: string
  end: string
  location: string
  is_visible?: boolean | null
  post_id?: number | null
  id?: number | null
  created_at?: string
  created_by: string
  last_updated?: string
  updated_by: string
}

export type LectureCreate = {
  title: string
  start: string
  end: string
  location: string
  is_visible?: boolean | null
  post_id: number
}

export type LectureCreateBase = {
  title: string
  start: string
  end: string
  location: string
  is_visible?: boolean | null
}

export type LecturePublic = {
  title: string
  start: string
  end: string
  location: string
  is_visible?: boolean | null
  post_id?: number | null
  id: number
}

export type LectureUpdate = {
  title: string
  start: string
  end: string
  location: string
  is_visible?: boolean | null
  post_id?: number | null
}

export type Lectures = {
  lectures: Array<Lecture>
  post: Post
}

export type LecturesCreate = {
  lectures: Array<LectureCreateBase>
  post: PostCreate
}

export type LecturesPublic = {
  lectures: Array<LecturePublic>
  count: number
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Post = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  id?: number | null
  group_id?: number
  created_at: string
  created_by: string
  last_updated?: string
  updated_by: string
}

export type PostCreate = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  group_id?: number
}

export type PostPublic = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  id: number
  group: Group
  lectures: Array<Lecture> | null
}

export type PostUpdate = {
  title: string
  description?: string | null
  content?: string | null
  image?: string | null
  is_visible?: boolean | null
  application_link: string | null
  group_id?: number
}

export type PostsPublic = {
  posts: Array<PostPublic>
  count: number
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
