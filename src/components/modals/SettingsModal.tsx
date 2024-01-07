'use client';

import useTheme from '@/hooks/useTheme';
import {
	Text,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SlideFade,
	Stack,
	useDisclosure,
	Box,
	Spacer,
	Button,
} from '@chakra-ui/react';
import { MdCheckCircle, MdFlag, MdKeyboardArrowDown } from 'react-icons/md';
import SelectModal from './SelectModal';
import useThemeValues from '@/hooks/useThemeValues';
import useLanguage from '@/hooks/useLanguage';

export default function SettingModal({
	isOpen,
	onClose,
}: Readonly<{ isOpen: boolean; onClose: any }>) {
	const { getThemeValue } = useThemeValues();
	const [languageId, setLanguageId, languages] = useLanguage();
	const [themeId, setThemeId, themes] = useTheme();

	const {
		isOpen: isLangOpen,
		onClose: onLangClose,
		onOpen: onLangOpen,
	} = useDisclosure();

	return (
		<Modal
			size="md"
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="inside"
			returnFocusOnClose={false}
		>
			<ModalOverlay />
			<ModalContent bg={getThemeValue('popup')}>
				<ModalHeader>Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing="15px">
						<FormControl
							gap="5px"
							display="flex"
							flexDirection="column"
						>
							<FormLabel htmlFor="language">
								<Heading size="sm" mb="10px">
									Language
								</Heading>
								<Button
									id="language"
									rightIcon={<MdKeyboardArrowDown />}
									onClick={onLangOpen}
								>
									{languages.find(
										(lang) => lang.id === languageId,
									)?.name ?? languages[0].name}
								</Button>
								<SelectModal
									isOpen={isLangOpen}
									onClose={onLangClose}
									listItems={languages.map(
										({ id, name }) => ({
											id,
											name,
											details:
												languageId === id
													? 'Recently used'
													: 'Set language',
											icon: <MdFlag />,
										}),
									)}
									initialSelectedId={themeId}
									onPreview={setLanguageId}
									onSelect={setLanguageId}
								/>
							</FormLabel>
						</FormControl>

						<Heading size="sm" mb="10px">
							Theme selector
						</Heading>
						<Grid gap="10px" templateColumns="repeat(4, 1fr)">
							{themes.map((theme) => (
								<GridItem
									key={theme.id}
									w="90px"
									h="90px"
									bg={theme.values.primaryDisplay}
									borderRadius="10px"
									style={
										theme.id === themeId
											? {
													outline: '3px solid',
													outlineOffset: '-3px',
													outlineColor:
														theme.values
															.midTransparency,
												}
											: undefined
									}
									_hover={{
										outline: '3px solid',
										outlineOffset: '-3px',
										outlineColor:
											theme.values.lowTransparency,
									}}
									onClick={() => setThemeId(theme.id)}
								>
									<Flex
										h="100%"
										w="100%"
										gap="5px"
										direction="column"
										alignItems="center"
									>
										<Spacer />
										<Box
											w="100%"
											borderBottomRadius="10px"
											bg={theme.values.lowAltTransparency}
										>
											<Flex
												w="100%"
												gap="2px"
												p="5px"
												direction="row"
												alignItems="center"
											>
												<Text
													fontSize="15px"
													color={theme.values.text}
													noOfLines={1}
												>
													{theme.name}
												</Text>
												<Spacer />
												<SlideFade
													in={theme.id === themeId}
												>
													{theme.id === themeId && (
														<Icon
															as={MdCheckCircle}
															zIndex={40}
															fontSize={[
																'20px',
																'22px',
															]}
														/>
													)}
												</SlideFade>
											</Flex>
										</Box>
									</Flex>
								</GridItem>
							))}
						</Grid>
					</Stack>
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
