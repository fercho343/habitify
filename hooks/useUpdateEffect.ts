import { useEffect, useRef } from "react";

export function useFirstRender() {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;
		return true;
	}

	return isFirst.current;
}

export function useUpdateEffect(effect: any, deps: any) {
	const isFirstRender = useFirstRender();

	useEffect(() => {
		if (!isFirstRender) return effect();
	}, deps);
}
