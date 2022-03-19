export type Form = {
	username: string;
	password: string;
};

export type FormProps = {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: (form: Form) => void;
};
