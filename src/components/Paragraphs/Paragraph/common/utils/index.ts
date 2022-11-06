import { memoize } from 'lodash';

type FormatStringToParagraphsProps = { string: string };

export const formatStringToParagraphs = memoize(({ string }: FormatStringToParagraphsProps): string[] => {
	return string.split('\n'[0]).filter((string) => string !== '\r');
});
