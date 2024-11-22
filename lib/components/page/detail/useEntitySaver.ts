import {useAlerts} from "../../alert/useAlerts.ts";
import {z, ZodError, ZodTypeAny} from "zod";
import {useErrorWrapper} from "../../alert/useErrorWrapper.ts";

export type ValidData<DATA, VALIDATION extends ZodTypeAny> = z.infer<VALIDATION> & Partial<DATA>
const hasId = (state: {id?: string}): state is {id: string} => state.id != undefined;

type Props<DATA, VALIDATION extends ZodTypeAny> = {
    data: DATA
    validationSchema: VALIDATION
    update: (existingEntity: ValidData<DATA, VALIDATION> & {id: string}) => void,
    create: (newEntity: ValidData<DATA, VALIDATION>) => void
}

export const useEntitySaver = <DATA extends {id?: string}, VALIDATION extends ZodTypeAny>(
    {data, validationSchema, update, create}: Props<DATA, VALIDATION>
) => {
    const {addAlert} = useAlerts();
    const {wrapWithErrorAlerts, handleError} = useErrorWrapper();

    const commitProps = {
        onCompleted: wrapWithErrorAlerts({onSuccess: () => addAlert('Erfolgreich gespeichert!', 'SUCCESS')}),
        onError: handleError
    }

    const validate = <DATA extends object, VALIDATION extends ZodTypeAny>(
        validationSchema: VALIDATION,
        data: Partial<DATA>
    ): ValidData<DATA, VALIDATION> | undefined => {
        try {
            const validatedData = validationSchema.parse(data)
            return { ...data, ...validatedData }
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.forEach(e => {
                    addAlert(`${e.path.join('/')}: ${e.message}`, 'WARNING')
                })
            } else {
                throw error
            }
        }
    };

    const save = () => {
        const validData = validate(validationSchema, data)
        if (validData && hasId(validData)) {
            update(validData);
        } else {
            validData && create(validData);
        }
    }

    return {save, commitProps};
}