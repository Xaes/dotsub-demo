import React, { FC } from "react";
import XIcon from "@heroicons/react/outline/XIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import useForm, { validateEmail } from "../../hooks/useForm";

const ShareList: FC<{
    sharedWith?: string[];
    onShareDelete: (email: string[]) => void;
    onShareAdd: (email: string[]) => void;
}> = ({ sharedWith, onShareAdd, onShareDelete }) => {
    const { items, submit, registerValue, reset } = useForm({
        items: {
            invites: {
                required: false,
                value: "",
                validate: {
                    fn: ({ value }) => {
                        if (value) {
                            const emails = (value as string).split(",");
                            return emails.every((e) => validateEmail(e.trim()));
                        }
                        return true;
                    },
                },
            },
        },
        onSubmit: ({ items }) => {
            if (items.invites.value) {
                onShareAdd((items.invites.value as string).split(","));
                reset();
            }
        },
    });

    const emailItems = sharedWith?.map((email) => {
        return (
            <div className="flex items-center group" key={email}>
                <div style={{ flex: "1 0 80%" }} className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-4 text-primary" />
                    <p className="font-bold text-black dark:text-white transition-colors">
                        {email}
                    </p>
                </div>
                <button
                    type="button"
                    className="pl-4 opacity-100 pointer-events-auto lg:opacity-0 transition-all lg:pointer-events-none lg:select-none lg:group-hover:opacity-100 group-hover:pointer-events-auto group-hover:select-all"
                    onClick={() => onShareDelete([email])}
                >
                    <XIcon className="h-5 w-5 fill-current text-red-600 transition-colors" />
                </button>
            </div>
        );
    });

    return (
        <div className="space-y-8">
            <h4 className="mb-8 text-xl xl:text-2xl text-black dark:text-white transition-colors">
                Shared With:
            </h4>
            <div className="space-y-4">{emailItems}</div>
            <form role="form" onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                    <input
                        placeholder="diego@xaes.dev, you@example.com..."
                        type="text"
                        value={items.invites.value as string}
                        onChange={({ target }) => registerValue("invites", target.value)}
                    />
                    {items.invites.hasError && (
                        <span className="error-feedback mt-2">
                            Emails are invalid. If you want to input multiple invitations,
                            you can use a comma to separate them.
                        </span>
                    )}
                    <button
                        type="button"
                        className="button primary-button mt-4 w-full"
                        onClick={submit}
                    >
                        Invite
                    </button>
                </div>
            </form>
        </div>
    );
};

ShareList.displayName = "ShareList";
export default ShareList;
