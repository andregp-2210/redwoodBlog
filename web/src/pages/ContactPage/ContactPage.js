import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Your message was submited!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    console.log({ data })
    create({
      variables: {
        input: data,
      },
    })
  }

  React.useEffect(() => {
    toast.error(error.message)
  }, [error])

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      {/* <FormError error={error} wrapperClassName="form-error" /> */}
      <Form
        onSubmit={onSubmit}
        formMethods={formMethods}
        config={{ mode: 'onBlur' }}
        error={error}
      >
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          id="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          id="email"
          validation={{
            required: {
              value: true,
              message: 'The email is required.',
            },
            pattern: {
              // value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" role="alert" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          id="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
