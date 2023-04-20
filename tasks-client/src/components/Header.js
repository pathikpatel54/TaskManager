import { useState } from "react";
import {
    createStyles,
    Container,
    UnstyledButton,
    Group,
    Menu,
    Burger,
    rem,
    Image,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSwitchHorizontal, IconChevronDown } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
        }`,
        marginBottom: rem(120),
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: "background-color 100ms ease",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.white,
        },

        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    userActive: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    tabs: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    tabsList: {
        borderBottom: "0 !important",
    },

    tab: {
        fontWeight: 500,
        height: rem(38),
        backgroundColor: "transparent",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
        },

        "&[data-active]": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
            borderColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[2],
        },
    },
}));

function HeaderTabs({ user }) {
    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection}>
                <Group position="apart">
                    <Image src="logo.svg" maw={120} p={5} />

                    <Burger
                        opened={opened}
                        onClick={toggle}
                        className={classes.burger}
                        size="sm"
                    />
                    {user ? (
                        <Menu
                            width={260}
                            position="bottom-end"
                            transitionProps={{ transition: "pop-top-right" }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, {
                                        [classes.userActive]: userMenuOpened,
                                    })}
                                >
                                    <Group spacing={7}>
                                        <Text
                                            weight={500}
                                            size="sm"
                                            sx={{ lineHeight: 1 }}
                                            mr={3}
                                        >
                                            Sample
                                        </Text>
                                        <IconChevronDown
                                            size={rem(12)}
                                            stroke={1.5}
                                        />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={
                                        <IconSwitchHorizontal
                                            size="0.9rem"
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Change account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        ""
                    )}
                </Group>
            </Container>
        </div>
    );
}

export default HeaderTabs;
