import {
	Box,
	Button,
	Group,
	ScrollArea,
	Stack,
	Text,
	rem,
} from "@mantine/core";
import { IconGridDots, IconHome } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ReactLogo from "../assets/react.svg";
import classes from "./Navbar.module.scss";
import styles from "./layout.module.scss";

export const Navbar: React.FC = () => {
	const {
		t,
		i18n: { changeLanguage, language },
	} = useTranslation("shell");
	const { pathname } = useLocation();

	const itemData = [
		{ link: "home", label: `${t("navbar.link.home")}`, icon: IconHome },
		{
			link: "products",
			label: `${t("navbar.link.products")}`,
			icon: IconGridDots,
		},
	];

	const links = itemData.map((item) => (
		<Link
			className={classes.link}
			data-active={pathname.includes(item.link) || undefined}
			to={item.link}
			key={item.link}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));

	return (
		<>
			<div className={classes.header}>
				<Group justify="space-between">
					<Group>
						<img alt="logo" src={ReactLogo} />
						<Text fw="bold" ff="monospace">
							Brand
						</Text>
					</Group>
				</Group>
			</div>

			<ScrollArea className={classes.links}>{links}</ScrollArea>

			<Stack w="100%" mb="sm" mt="auto" px="md">
				<Group justify="space-around">
					<Text size="sm">{t("navbar.language")}</Text>
					<Group>
						<Button
							p={0}
							variant="transparent"
							color={language === "en" ? "dark" : "gray"}
							onClick={() => {
								changeLanguage("en");
							}}
						>
							EN
						</Button>
						|
						<Button
							p={0}
							variant="transparent"
							color={language === "tr" ? "dark" : "gray"}
							onClick={() => {
								changeLanguage("tr");
							}}
						>
							TR
						</Button>
					</Group>
				</Group>
			</Stack>
		</>
	);
};

export default Navbar;
