import React from 'react'
import Slide from '../Slide'
import renderer from 'react-test-renderer'

const MARKDOWN =
  '# Heading 1\n\n---\n\n' +
  '## Heading 2\n\n- List Item 1\n  - Sub List Item\n- List Item 2\n- List Item 3\n- List Item 4\n- List Item 5\n\n---\n\n' +
  '### Heading 3\n\n1. Numbered Item 1\n   1. Sub Numbered Item\n2. Numbered Item 2\n3. Numbered Item 3\n4. Numbered Item 4\n5. Numbered Item 5\n\n---\n\n' +
  "#### Heading 4\n\n```javascript\nconst variable = '123'\nconsole.log(variable)\n```\n\n---\n\n" +
  '##### Heading 5\n\n*Italic text*  \n**Bold text**  \n~~Strikethrough text~~\n\n---\n\n' +
  '###### Heading 6\n\n[Slidesdown](https://slidesdown.com)\n\n> Blockquote'

it('renders correctly', () => {
  const tree = renderer
    .create(<Slide height={450} scale={1} markdown={MARKDOWN} width={800} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})