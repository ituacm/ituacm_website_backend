import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi"

import type { PostPublic, EventPublic, UserPublic, Lecture, LecturePublic } from "../../client"
import EditUser from "../Admin/EditUser"
import EditPost from "../Posts/EditPost"
import EditEvent from "../Events/EditEvent"
import EditLecture from "../Lectures/EditLecture"
import AddLecture from "../Lectures/AddLecture"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: PostPublic | EventPublic | UserPublic | Lecture
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure();
  const editPostModal = useDisclosure();
  const editEventModal = useDisclosure();
  const editLectureModal = useDisclosure();
  const addLectureModal = useDisclosure();
  const deleteModal = useDisclosure();

  const handleEditOpen = () => {
    if (type === "User") {
      editUserModal.onOpen();
    } else if (type === "Post") {
      editPostModal.onOpen();
    } else if (type === "Event") {
      editEventModal.onOpen();
    } else if (type === "Lecture") {
      editLectureModal.onOpen();
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={handleEditOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit {type}
          </MenuItem>
          {(value as PostPublic).group && (value as PostPublic).group.id != 1 && <MenuItem
            onClick={addLectureModal.onOpen}
            icon={<FiPlus fontSize="16px" />}
          > 
            Add Lecture 
          </MenuItem>}
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete {type}
          </MenuItem>
        </MenuList>

        {type === "User" && (
          <EditUser
            user={value as UserPublic}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        )}
        {type === "Post" && (
          <EditPost
            post={value as PostPublic}
            isOpen={editPostModal.isOpen}
            onClose={editPostModal.onClose}
          />
        )}
        {type === "Event" && (
          <EditEvent
            event={value as EventPublic}
            isOpen={editEventModal.isOpen}
            onClose={editEventModal.onClose}
          />
        )}
        {type === "Lecture" && (
          <EditLecture
            lecture={value as LecturePublic}
            isOpen={editLectureModal.isOpen}
            onClose={editLectureModal.onClose}
          />
        )}

        {type === "Post" && (
          <AddLecture
            post={(value as PostPublic)}
            isOpen={addLectureModal.isOpen}
            onClose={addLectureModal.onClose}
          />
        )}

        <Delete
          type={type}
          id={String(value.id)} // Convert id to string
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  );
}

export default ActionsMenu
