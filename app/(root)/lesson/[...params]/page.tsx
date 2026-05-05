import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Lesson({ params }: { params: { params: string[] } }) {
  const [subject, id] = params.params

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href={`/subjects/${subject}`} className="text-blue-600 hover:text-blue-800">
          &larr; Back to {subject} Lessons
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Lesson {id}: Introduction to {subject}</h1>
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">What are Fractions?</h2>
        <p className="mb-4">
          Fractions represent parts of a whole. They are written with a numerator (top number) 
          and a denominator (bottom number), separated by a line.
        </p>
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-center text-4xl">1/2</p>
        </div>
        <h3 className="text-xl font-semibold mb-2">Example:</h3>
        <p>
          If you have a pizza cut into 8 slices and you eat 3 slices, you've eaten 3/8 of the pizza.
        </p>
      </div>
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">Practice Question</h2>
        <p className="mb-4">What fraction of the shape is colored?</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`h-12 ${i < 3 ? 'bg-blue-500' : 'bg-gray-300'} rounded`}></div>
          ))}
        </div>
        <form className="space-y-2">
          <div>
            <input type="radio" id="a" name="answer" value="a" className="mr-2" />
            <label htmlFor="a">1/4</label>
          </div>
          <div>
            <input type="radio" id="b" name="answer" value="b" className="mr-2" />
            <label htmlFor="b">1/3</label>
          </div>
          <div>
            <input type="radio" id="c" name="answer" value="c" className="mr-2" />
            <label htmlFor="c">1/2</label>
          </div>
          <div>
            <input type="radio" id="d" name="answer" value="d" className="mr-2" />
            <label htmlFor="d">3/4</label>
          </div>
        </form>
      </div>
      <div className="flex justify-between">
        <Link href={`/lesson/${subject}/${Number(id) - 1}`} className="btn-secondary flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Previous Lesson
        </Link>
        <Link href={`/lesson/${subject}/${Number(id) + 1}`} className="btn-primary flex items-center">
          Next Lesson
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </div>
  )
}

