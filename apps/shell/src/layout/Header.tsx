import { Box, Burger, Group } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactLogo from "../assets/react.svg";
import styles from "./layout.module.scss";
import { catchRemoteErrors } from "../lib/catchRemoteErrors";

const CartButton = React.lazy(() =>
	import("productMF/CartButton")
		.then((module) => {
			return module;
		})
		.catch(catchRemoteErrors),
);

function Header({
	mobileOpened,
	toggleMobile,
}: {
	mobileOpened: boolean;
	toggleMobile: () => void;
}) {
	const { i18n } = useTranslation("shell");
	return (
		<Group h="100%" align="center" justify="center " pos="relative">
			<Box id="header-section__left" pos="absolute" left={0}>
				<Group align="center">
					<Burger
						opened={mobileOpened}
						onClick={toggleMobile}
						hiddenFrom="md"
						size="md"
					/>
					{/**
					 * Navbar is disabled on Desktop environment
					 * You can enable it by uncommenting the code below
					 * */}
					{/* 
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          */}
				</Group>
			</Box>
			<Box className={styles.logo}>
				<img src={ReactLogo} alt="Application Logo" />
			</Box>
			<Box id="header-section__right" pos="absolute" right={0}>
				<CartButton />
			</Box>
		</Group>
	);
}

export default Header;
