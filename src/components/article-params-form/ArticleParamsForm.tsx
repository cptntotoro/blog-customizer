import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { clsx } from 'clsx';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const asideFormRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	const handleChange =
		(field: keyof typeof formState) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: option,
			}));
		};

	const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(currentState);
		onReset();
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideFormRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={asideFormRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
