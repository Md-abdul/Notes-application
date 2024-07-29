import { Box, Flex, Text } from "@chakra-ui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function SidebarItem({ item, activeTab, setActiveTab, isSidebarCollapsed }) {
  const IconComponent = item.icon;

  return (
    <Flex
      as={motion.div}
      layout
      className={clsx("sidebar-item", {
        "sidebar-item__active": activeTab === item.id,
      })}
      align="center"
      p={4}
      onMouseOver={() => setActiveTab(item.id)}
      onMouseLeave={() => setActiveTab(item.id)}
      cursor="pointer"
      position="relative"
    >
      {activeTab === item.id && (
        <Box
          as={motion.div}
          layoutId="sidebar-item-indicator"
          className="sidebar-item__active-bg"
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          width="4px"
          bg="blue.400"
        />
      )}
      <Box className="sidebar-item__icon" mr={isSidebarCollapsed ? 0 : 4}>
        <IconComponent size={20} />
      </Box>
      <motion.div
        className="sidebar-item__title"
        animate={{
          clipPath: isSidebarCollapsed
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 0%)",
          opacity: isSidebarCollapsed ? 0 : 1,
        }}
        initial={false}
      >
        <Text fontSize="md">{item.title}</Text>
      </motion.div>
    </Flex>
  );
}

SidebarItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
};

export default SidebarItem;
