import { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  Avatar,
  Button,
} from "@chakra-ui/react";
import {
  LuHome,
  LuMail,
  LuFolderClosed,
  LuStickyNote,
  LuBell,
  LuChevronRight,
  LuChevronLeft,
  LuLogOut,
} from "react-icons/lu";

import "../Custom-Style/Sidebar.css";
import { auth, db } from "../Components/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { keyframes } from "@emotion/react";
import MainContent from "./MainContent";
import SidebarItem from "./SidebarItem";

const rgbAnimation = keyframes`
  0% { border-color: #ff0000; }
  33% { border-color: #00ff00; }
  66% { border-color: #0000ff; }
  100% { border-color: #ff0000; }
`;

const SIDEBAR_ITEMS = [
  { id: "dashboard", title: "Dashboard", icon: LuHome },
  { id: "mail", title: "Mail", icon: LuMail },
  { id: "projects", title: "Projects", icon: LuFolderClosed },
  { id: "reports", title: "Reports", icon: LuStickyNote },
  { id: "notifications", title: "Notifications", icon: LuBell },
];

function Sidebar({ isCollapsed, setIsCollapsed, activeTab, setActiveTab }) {
  const [userDetials, setUserDetials] = useState(null);
  const navigate = useNavigate();

  const fetchDataUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetials(docSnap.data());
      } else {
        console.log("error");
      }
    });
  };
  console.log(userDetials);
  useEffect(() => {
    fetchDataUser();
  }, []);

  async function handelLogout() {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      //
    }
  }

  const sidebarBg = useColorModeValue("gray.100", "gray.800");
  const sidebarWidth = isCollapsed ? "80px" : "280px";

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <Box
        as={motion.div}
        width={sidebarWidth}
        bg={sidebarBg}
        className="sidebar"
        layout
        boxShadow="md"
        position="relative"
      >

        {userDetials ? (
          <Flex
            direction="column"
            align="center"
            p={4}
            display={isCollapsed ? "none" : "flex"}
          >
            <Box
              boxShadow="lg"
              borderRadius="full"
              border="5px solid black"
              animation={`${rgbAnimation} 3s infinite linear`}
            >
              <Avatar
                src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/f8239007-7d36-45ce-a0a1-fdf91052b10e/299f5e14-73c4-4a9b-99c9-e44adbc218cf.png"
                size="2xl"
                mb={2}
                boxShadow={"lg"}
              />
            </Box>
            <Text fontWeight="bold">
              {userDetials.firstName} {userDetials.lastName}
            </Text>
            <Text fontSize="sm">{userDetials.email}</Text>
          </Flex>
        ) : (
          <h1>Loading</h1>
        )}

        <IconButton
          aria-label="Collapse sidebar"
          icon={isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar__collapse-button"
          position="absolute"
          top="16px"
          right={isCollapsed ? "16px" : "-16px"}
          border="1px solid"
        />

        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSidebarCollapsed={isCollapsed}
          />
        ))}

        <Flex
          align="center"
          justify="center"
          p={4}
          position="absolute"
          bottom="16px"
          width="100%"
          mr={30}
        >
          <Button
            variant="ghost"
            leftIcon={<LuLogOut />}
            bg="red.500"
            onClick={handelLogout}
            display={isCollapsed ? "none" : "flex"}
            className="ml-30"
            _hover={{ bg: "red.700" }}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    </MotionConfig>
  );
}

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(SIDEBAR_ITEMS[0].id);

  return (
    <Flex className="dashboard" height="100vh">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <MainContent />
    </Flex>
  );
}

export default Dashboard;
