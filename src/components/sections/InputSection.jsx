import Card from '../Card'
import RegularCheckbox from '../inputs/RegularCheckbox'
import RegularInput from '../inputs/RegularInput'
import RegularTextarea from '../inputs/RegularTextarea'
import PrimaryButton from '../buttons/PrimaryButton'

const InputSection = ({
  titleCount,
  title,
  content,
  archive,
  titleInputListener,
  contentInputListener,
  archiveCheckListener,
  onSubmit,
}) => {
  return (
    <section aria-label="input form">
      <Card className="bg-white" headerCaption={'Insert New Data'}>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-col gap-3">
            <p className="text-end">
              {titleCount - title.length >= 0 ? titleCount - title.length : 0}{' '}
              character(s) remaining
            </p>
            <RegularInput
              description="Title"
              type="text"
              className="w-full"
              isRequired={true}
              value={title}
              onChange={titleInputListener}
            />
            <RegularTextarea
              description="Content"
              className="w-full"
              isRequired={true}
              value={content}
              onChange={contentInputListener}
            />
            <RegularCheckbox
              description="Is it archived?"
              checked={archive}
              onChange={archiveCheckListener}
            />
            <PrimaryButton
              description="Submit"
              className={`w-fit text-white ${
                titleCount - title.length >= 0 ? 'bg-green-600' : 'bg-gray-600'
              }`}
              type="submit"
              disabled={titleCount - title.length >= 0 ? false : true}
            />
          </div>
        </form>
      </Card>
    </section>
  )
}

export default InputSection
