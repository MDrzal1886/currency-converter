const useErrorMessage = (setErrorMessage: (value: string) => void) => {
	const convertStatusToMessage = (status: number) => {
		if (status >= 500) {
			setErrorMessage('Błąd serwera, spróbuj ponownie później.');
			return;
		}
		switch (status) {
			case 400:
				setErrorMessage('Nie udało się wykonać żądanej operacji, ponieważ zostały podane błędne dane.');
				break;
			case 401:
				setErrorMessage('Nie udało się wykonać żądanej operacji, ponieważ klucz jest nieaktywny lub błędny.');
				break;
			case 404:
				setErrorMessage('Nie udało się wykonać żądanej operacji, ponieważ nie znaleziono zasobu powiązanego z żądaniem.');
				break;
			case 429:
				setErrorMessage('Nie udało się wykonać żądanej operacji, ponieważ limit zapytań do API został wykorzystany.');
				break;
		}
	}
	return {
		convertStatusToMessage
	}
}

export default useErrorMessage;