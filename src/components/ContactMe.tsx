import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/cv';
import { Section } from './ui';

interface Inputs {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactMe() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = ({ name, email, subject, message }) => {
        // encodeURIComponent es imprescindible: sin el, un '&' o un '#' en el
        // asunto o el mensaje truncaba el mailto y se perdia parte del texto.
        const body = `${message}\n\n${name} <${email}>`;
        window.location.href =
            `mailto:${profile.email}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;
    };

    const fieldError = (key: keyof Inputs) =>
        errors[key] ? (
            <span role="alert" className="text-xs text-red-400">
                {errors[key]?.message}
            </span>
        ) : null;

    return (
        <Section id="contact" title={t('contact.title')} centered>
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
                <h3 className="text-center text-2xl font-semibold underline decoration-accent/50 sm:text-3xl">
                    {t('contact.heading')}
                </h3>

                <div className="flex flex-col items-center gap-2 text-sm sm:text-base">
                    <p className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
                        {t('about.location')}
                    </p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-3 break-all hover:text-accent"
                    >
                        <EnvelopeIcon className="h-5 w-5 shrink-0 text-accent" />
                        {profile.email}
                    </a>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3" noValidate>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <input
                                {...register('name', { required: t('contact.required') })}
                                placeholder={t('contact.name')}
                                aria-label={t('contact.name')}
                                className="contactInput"
                                type="text"
                            />
                            {fieldError('name')}
                        </div>
                        <div className="flex flex-col gap-1">
                            <input
                                {...register('email', {
                                    required: t('contact.required'),
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: t('contact.invalidEmail') },
                                })}
                                placeholder={t('contact.email')}
                                aria-label={t('contact.email')}
                                className="contactInput"
                                // Antes la version movil usaba type="text": el teclado
                                // del telefono no mostraba la tecla @.
                                type="email"
                            />
                            {fieldError('email')}
                        </div>
                    </div>

                    <input
                        {...register('subject', { required: t('contact.required') })}
                        placeholder={t('contact.subject')}
                        aria-label={t('contact.subject')}
                        className="contactInput"
                        type="text"
                    />
                    {fieldError('subject')}

                    <textarea
                        {...register('message', { required: t('contact.required') })}
                        placeholder={t('contact.message')}
                        aria-label={t('contact.message')}
                        rows={5}
                        className="contactInput"
                    />
                    {fieldError('message')}

                    <button
                        type="submit"
                        className="rounded-md bg-accent px-8 py-3 text-base font-bold text-canvas transition-opacity hover:opacity-90"
                    >
                        {t('contact.submit')}
                    </button>
                </form>
            </div>
        </Section>
    );
}
