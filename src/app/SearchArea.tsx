"use client"

import { useState } from "react"
import { TextField, Button } from "~/components"
import type { Book } from "@prisma/client"

const filters = [
  "Title",
  "Publisher",
  "Publication Place",
  "Publication Year",
  "Author",
  "Section",
]

export default function SearchArea({ books }: { books: Book[] }) {
  const [value, setValue] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  return (
    <div>
      <TextField
        label="Search book..."
        value={value}
        onChange={newVal => setValue(newVal)}
      />
      <table className="w-full">
        <thead className="border-b font-semibold">
          <tr>
            {filters.map(filter => (
              <td key={filter}>
                <Button
                  variant="plain"
                  data-selected={filter === selectedFilter || undefined}
                  className="w-full text-left data-[hovered]:bg-indigo-400 data-[selected]:bg-indigo-400 data-[hovered]:text-white data-[selected]:text-white"
                  onPress={e =>
                    setSelectedFilter(
                      e.target.innerHTML === selectedFilter
                        ? null
                        : e.target.innerHTML
                    )
                  }
                >
                  {filter}
                </Button>
              </td>
            ))}
            <td>Volume</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {books
            .filter(book => {
              switch (selectedFilter) {
                case "Author":
                  // @ts-expect-error
                  return `${book.author.name} ${book.author.surname}`
                    .toLowerCase()
                    .includes(value.toLowerCase())
                case "Section":
                  // @ts-expect-error
                  return book.section.name
                    .toLowerCase()
                    .includes(value.toLowerCase())
                default:
                  // @ts-expect-error
                  return book[selectedFilter?.toLowerCase() || "title"]
                    .toLowerCase()
                    .includes(value.toLowerCase())
              }
            })
            .map(book => (
              <tr key={book.signature}>
                <td>{book.title}</td>
                <td>{book.publisher}</td>
                <td>{book.publicationPlace}</td>
                <td>{book.publicationYear}</td>
                <td>
                  {/* @ts-expect-error */}
                  {book.author.name} {book.author.surname}
                </td>
                {/* @ts-expect-error */}
                <td>{book.section.name}</td>
                <td>{book.volume}</td>
                <td>{book.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
