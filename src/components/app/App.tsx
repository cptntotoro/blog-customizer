import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const [stylesState, setStylesState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newStyles: ArticleStateType) => {
		setStylesState(newStyles);
	};

	const handleReset = () => {
		setStylesState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': stylesState.fontFamilyOption.value,
					'--font-size': stylesState.fontSizeOption.value,
					'--font-color': stylesState.fontColor.value,
					'--container-width': stylesState.contentWidth.value,
					'--bg-color': stylesState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={stylesState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
