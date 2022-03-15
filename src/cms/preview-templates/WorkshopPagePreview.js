import React from 'react'
import PropTypes from 'prop-types'
import { WorkshopPageTemplate } from '../../templates/workshop-page'

const WorkshopPagePreview = ({ entry, widgetFor }) => (
  <WorkshopPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

WorkshopPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default WorkshopPagePreview
