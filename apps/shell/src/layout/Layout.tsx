import { AppShell, Box, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import styles from "./layout.module.scss";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 250,
				breakpoint: "md",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			footer={{
				height: "auto",
				collapsed: true,
			}}
			padding="md"
		>
			<AppShell.Header px="md">
				<Header mobileOpened={mobileOpened} toggleMobile={toggleMobile} />
			</AppShell.Header>
			<AppShell.Navbar>
				<Navbar />
			</AppShell.Navbar>
			<AppShell.Main>
				<Stack h="100%">
					<Box className={styles.content}>{children}</Box>
				</Stack>
			</AppShell.Main>
			<AppShell.Footer
				pos="unset"
				ml={{
					_: "auto",
					md: 250,
				}}
				p="md"
			>
				<Footer />
			</AppShell.Footer>
		</AppShell>
	);
};

export default Layout;
