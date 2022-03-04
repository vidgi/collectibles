import React from 'react'
import PropTypes from 'prop-types'
import { ExplorerPageTemplate } from '../../templates/explorer-page'

const ExplorerPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <ExplorerPageTemplate
        description={data.description}
        content={widgetFor('body')}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

ExplorerPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ExplorerPagePreview
