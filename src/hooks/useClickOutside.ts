import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
} from 'react';

const useOutsideClick = <T extends HTMLElement>(
	ref: RefObject<T>,
	handleClose: Dispatch<SetStateAction<boolean>>
) => {
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent | TouchEvent) =>  {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				handleClose(false);
			}
		}
		
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		};
	}, [ref, handleClose]);
}

export default useOutsideClick;