import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiEdit, FiTrash } from "react-icons/fi"

import type { PostPublic, EventPublic, UserPublic } from "../../client"
import EditUser from "../Admin/EditUser"
import EditPost from "../Posts/EditPost"
import EditEvent from "../Events/EditEvent"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: PostPublic | EventPublic | UserPublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure();
  const editPostModal = useDisclosure();
  const editEventModal = useDisclosure();
  const deleteModal = useDisclosure();

  const handleEditOpen = () => {
    if (type === "User") {
      editUserModal.onOpen();
    } else if (type === "Post") {
      editPostModal.onOpen();
    } else if (type === "Event") {
      editEventModal.onOpen();
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
