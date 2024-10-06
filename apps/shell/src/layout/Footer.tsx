import { Container, Group, ActionIcon, rem, Text } from "@mantine/core";
import {
	IconBrandTwitter,
	IconBrandYoutube,
	IconBrandInstagram,
} from "@tabler/icons-react";
import ReactLogo from "../assets/react.svg";
import classes from "./Footer.module.scss";

export const Footer: React.FC = () => {
	return (
		<Container className={classes.inner}>
			<Group>
				<img alt="logo" src={ReactLogo} />
				<Text fw="bold" ff="monospace">
					Brand
				</Text>
			</Group>
			<Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
				<ActionIcon size="lg" color="gray" variant="subtle">
					<IconBrandTwitter
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon size="lg" color="gray" variant="subtle">
					<IconBrandYoutube
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				</ActionIcon>
				<ActionIcon size="lg" color="gray" variant="subtle">
					<IconBrandInstagram
						style={{ width: rem(18), height: rem(18) }}
						stroke={1.5}
					/>
				</ActionIcon>
			</Group>
		</Container>
	);
};

export default Footer;
