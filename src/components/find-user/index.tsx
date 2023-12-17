import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function FindUserInput({
    value,
    setValue,
    fixedUser,
    allUsers,
    disabledUsers,
}: {
    value: any;
    setValue: Function;
    fixedUser: any;
    allUsers?: any;
    disabledUsers: any;
}) {
    const [fixedOptions, setFixedOptions] = React.useState<any>([]);
    const userEmail = [...disabledUsers];

    //     const getAllUser = async () => {
    //         const allUser = await getAllUserEmailApi();
    //         if (allUser.length) {
    //             setFixedOptions(allUser);
    //         }
    //     };
    //     React.useEffect(() => {
    //         getAllUser();
    //     }, []);

    React.useEffect(() => {
        if (allUsers) {
            setFixedOptions(allUsers);
        } else setFixedOptions(fixedUser);
    }, []);

    React.useEffect(() => {
        if (userEmail.length && fixedOptions.length) {
            if (value.length === 0) setValue([...userEmail]);
        }
    }, [fixedOptions]);

    return fixedOptions.length && userEmail.length && value.length ? (
        <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={value}
            onChange={(event, newValue) => {
                setValue([
                    ...userEmail,
                    ...newValue.filter(
                        (option) => !userEmail.find((u) => u.email === option.email),
                    ),
                ]);
            }}
            options={fixedOptions}
            getOptionLabel={(option) => option.email}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                    return (
                        <Chip
                            label={option.email}
                            {...getTagProps({ index })}
                            disabled={userEmail.find((e) => e.email === option.email)}
                        />
                    );
                })
            }
            fullWidth
            renderInput={(params) => (
                <TextField {...params} label="Add user" placeholder="User email" />
            )}
        />
    ) : (
        <></>
    );
}
