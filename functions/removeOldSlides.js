const DATE_OFFSET = 1000 * 60 * 60 * 24 * 30
const dateThirtyDaysAgo = new Date()
dateThirtyDaysAgo.setTime(dateThirtyDaysAgo.getTime() - DATE_OFFSET)

const getOldSlides = db =>
  db
    .collection('slides')
    .where('createdAt', '<', dateThirtyDaysAgo)
    .get()

const removeSlide = slide =>
  slide.ref.delete().then(() => {
    console.log(`Deleted document ${slide.id}`)
  })

module.exports = (event, db) =>
  getOldSlides(db).then(slides => {
    console.log(
      `${slides.size} slides created before ${dateThirtyDaysAgo.toJSON()}`
    )

    slides.forEach(slide => {
      const { visitedAt } = slide.data()

      // Remove when visitedAt is undefined or old
      if (!visitedAt || visitedAt < dateThirtyDaysAgo) {
        removeSlide(slide)
        console.log(`${slide.id}: Removed`)
      } else {
        console.log(
          `${slide.id}: Not removing, last visit ${visitedAt.toJSON()}`
        )
      }
    })
  })
