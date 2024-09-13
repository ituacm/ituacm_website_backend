export const $Body_login_login_access_token = {
  properties: {
    grant_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
    },
    username: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    scope: {
      type: "string",
      default: "",
    },
    client_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    client_secret: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $Event = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    created_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    last_updated: {
      type: "string",
      format: "date-time",
    },
    updated_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $EventCreate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $EventPublic = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $EventUpdate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $EventsPublic = {
  properties: {
    events: {
      type: "array",
      contains: {
        type: "EventPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Group = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $GroupBase = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $GroupPublic = {
  properties: {
    name: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $GroupsPublic = {
  properties: {
    groups: {
      type: "array",
      contains: {
        type: "GroupPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      default: 0,
    },
  },
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const

export const $Lecture = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    post_id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    created_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    last_updated: {
      type: "string",
      format: "date-time",
    },
    updated_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $LectureCreate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    post_id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $LectureCreateBase = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $LecturePublic = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    post_id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $LectureUpdate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    start: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    end: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    location: {
      type: "string",
      isRequired: true,
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    post_id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $Lectures = {
  properties: {
    lectures: {
      type: "array",
      contains: {
        type: "Lecture",
      },
      isRequired: true,
    },
    post: {
      type: "Post",
      isRequired: true,
    },
  },
} as const

export const $LecturesCreate = {
  properties: {
    lectures: {
      type: "array",
      contains: {
        type: "LectureCreateBase",
      },
      isRequired: true,
    },
    post: {
      type: "PostCreate",
      isRequired: true,
    },
  },
} as const

export const $LecturesPublic = {
  properties: {
    lectures: {
      type: "array",
      contains: {
        type: "LecturePublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Message = {
  properties: {
    message: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $NewPassword = {
  properties: {
    token: {
      type: "string",
      isRequired: true,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $Post = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "any-of",
      contains: [
        {
          type: "number",
        },
        {
          type: "null",
        },
      ],
    },
    group_id: {
      type: "number",
      default: 1,
    },
    created_at: {
      type: "string",
      isRequired: true,
      format: "date-time",
    },
    created_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
    last_updated: {
      type: "string",
      format: "date-time",
    },
    updated_by: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $PostCreate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    group_id: {
      type: "number",
      default: 1,
    },
  },
} as const

export const $PostPublic = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "number",
      isRequired: true,
    },
    group: {
      type: "Group",
      isRequired: true,
    },
    lectures: {
      type: "any-of",
      contains: [
        {
          type: "array",
          contains: {
            type: "Lecture",
          },
        },
        {
          type: "null",
        },
      ],
      isRequired: true,
    },
  },
} as const

export const $PostUpdate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    content: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    image: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_visible: {
      type: "any-of",
      contains: [
        {
          type: "boolean",
        },
        {
          type: "null",
        },
      ],
    },
    application_link: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    group_id: {
      type: "number",
      default: 1,
    },
  },
} as const

export const $PostsPublic = {
  properties: {
    posts: {
      type: "array",
      contains: {
        type: "PostPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $Token = {
  properties: {
    access_token: {
      type: "string",
      isRequired: true,
    },
    token_type: {
      type: "string",
      default: "bearer",
    },
  },
} as const

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "string",
      isRequired: true,
      maxLength: 255,
    },
    photo_url: {
      type: "string",
      isRequired: true,
    },
    role: {
      type: "string",
      isRequired: true,
    },
    department: {
      type: "string",
      isRequired: true,
    },
    github_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    linked_in_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_public: {
      type: "boolean",
      default: false,
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "string",
      isRequired: true,
      maxLength: 255,
    },
    photo_url: {
      type: "string",
      isRequired: true,
    },
    role: {
      type: "string",
      isRequired: true,
    },
    department: {
      type: "string",
      isRequired: true,
    },
    github_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    linked_in_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_public: {
      type: "boolean",
      default: false,
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $UserUpdate = {
  properties: {
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "string",
      isRequired: true,
      maxLength: 255,
    },
    photo_url: {
      type: "string",
      isRequired: true,
    },
    role: {
      type: "string",
      isRequired: true,
    },
    department: {
      type: "string",
      isRequired: true,
    },
    github_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    linked_in_url: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_public: {
      type: "boolean",
      default: false,
    },
    password: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 40,
          minLength: 8,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UsersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "UserPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const
