import Navbar from '../components/Navbar'
import Card from '../components/Card'
import RegularInput from '../components/inputs/RegularInput'
import RegularTextarea from '../components/inputs/RegularTextarea'
import RegularCheckbox from '../components/inputs/RegularCheckbox'
import PrimaryButton from '../components/buttons/PrimaryButton'

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 w-3/5">
        <section id="input-form">
          <Card className="bg-white" header={'Insert New Data'}>
            <form method="post">
              <div className="flex flex-col gap-3">
                <RegularInput
                  description="Title"
                  type="text"
                  className="w-full"
                  isRequired="true"
                />
                <RegularTextarea
                  description="Content"
                  className="w-full"
                  isRequired="true"
                />
                <RegularCheckbox description="Is it archived?" />
                <PrimaryButton
                  description="Submit"
                  className="w-fit"
                  type="submit"
                />
              </div>
            </form>
          </Card>
        </section>
      </main>
    </>
  )
}

export default HomePage
