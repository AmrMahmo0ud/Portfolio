import { useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import Icon from './Icon'

const emptyValues = { name: '', email: '', subject: '', message: '' }
const fieldOrder = ['name', 'email', 'subject', 'message']
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your full name (at least 2 characters).'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!emailPattern.test(values.email.trim()))
    errors.email = 'Enter a valid email address, like name@example.com.'
  if (values.subject.trim().length < 3) errors.subject = 'Add a short subject (at least 3 characters).'
  if (values.message.trim().length < 20)
    errors.message = 'Write a message of at least 20 characters so I have some context.'
  return errors
}

function buildMailto(values) {
  const params = new URLSearchParams({
    subject: values.subject.trim(),
    body: `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`,
  })
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${profile.email}?${params.toString().replace(/\+/g, '%20')}`
}

/**
 * Contact form with client-side validation.
 *
 * If `profile.contactEndpoint` is set, the form POSTs JSON to it and only
 * reports success when the endpoint responds OK. Without an endpoint nothing
 * is sent: the form says so and offers the visitor's email app instead.
 */
export default function ContactForm() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  // idle | submitting | success | error | unconfigured
  const [status, setStatus] = useState('idle')
  const fieldRefs = useRef({})

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstInvalid = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    if (!profile.contactEndpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(profile.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('success')
      setValues(emptyValues)
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (name) => {
    const showError = touched[name] && errors[name]
    return {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: handleChange,
      onBlur: handleBlur,
      ref: (node) => {
        fieldRefs.current[name] = node
      },
      className: 'field-input',
      'aria-invalid': showError ? 'true' : 'false',
      'aria-describedby': showError ? `contact-${name}-error` : undefined,
    }
  }

  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <p id={`contact-${name}-error`} className="field-error">
        <Icon name="alert" size={15} />
        {errors[name]}
      </p>
    ) : null

  const submitting = status === 'submitting'

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      className="rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-9"
    >
      <h3 id="contact-form-title" className="text-xl font-semibold tracking-[-0.02em]">
        Send a message
      </h3>
      <p className="mt-1.5 text-[0.95rem] text-muted">All fields are required.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Full name
          </label>
          <input type="text" autoComplete="name" placeholder="Jane Doe" {...fieldProps('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            Email address
          </label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@example.com"
            {...fieldProps('email')}
          />
          {fieldError('email')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="field-label">
            Subject
          </label>
          <input type="text" placeholder="What's this about?" {...fieldProps('subject')} />
          {fieldError('subject')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            Message
          </label>
          <textarea rows={6} placeholder="Tell me a bit about your project or role." {...fieldProps('message')} />
          {fieldError('message')}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary sm:min-w-44" disabled={submitting}>
          {submitting ? (
            <>
              <Icon name="loader" size={17} className="animate-spin" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </button>
      </div>

      <div aria-live="polite" className="empty:hidden mt-6">
        {status === 'success' && (
          <p className="flex gap-3 rounded-[var(--radius-md)] border border-accent/40 bg-accent/10 p-4 text-[0.95rem] text-text">
            <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
            Message sent. Thanks for reaching out, I&apos;ll reply to the email you provided.
          </p>
        )}
        {status === 'error' && (
          <p className="flex gap-3 rounded-[var(--radius-md)] border border-danger/40 bg-danger/10 p-4 text-[0.95rem] text-text">
            <Icon name="alert" size={18} className="mt-0.5 shrink-0 text-danger" />
            The message couldn&apos;t be sent. Check your connection and try again
            {profile.email ? ', or email me directly.' : '.'}
          </p>
        )}
        {status === 'unconfigured' && (
          <div className="rounded-[var(--radius-md)] border border-line-strong bg-bg p-4 text-[0.95rem]">
            <p className="flex gap-3 text-text">
              <Icon name="info" size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>
                This form isn&apos;t connected to an email service yet, so your message was{' '}
                <strong className="font-semibold">not sent</strong>.{' '}
                {profile.email
                  ? 'You can send the same message from your email app instead.'
                  : 'Please reach out on GitHub for now.'}
              </span>
            </p>
            {(profile.email || profile.githubUrl) && (
              <a
                href={profile.email ? buildMailto(values) : profile.githubUrl}
                {...(profile.email ? {} : { target: '_blank', rel: 'noreferrer' })}
                className="btn btn-ghost btn-sm mt-4 ml-8"
              >
                <Icon name={profile.email ? 'mail' : 'github'} size={16} />
                {profile.email ? 'Open in email app' : 'Go to GitHub'}
              </a>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
