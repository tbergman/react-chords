import React from 'react'
import Helmet from 'react-helmet'
import Chord from '../../Chord'
import { Link } from 'react-router'
import Play from '../../Play'
import './styles.css'

const getDatabase = instrument =>
  require(`@tombatossals/chords-db/lib/${instrument}.json`)

const getBlocks = keys => {
  var temp = keys.slice()
  var arr = []

  while (temp.length) {
    arr.push(temp.splice(0, 3))
  }

  return arr
}

const Variations = ({ params }) => {
  const name = params.instrument || 'guitar'
  const instrument = getDatabase(name)
  const chord = instrument.chords[params.key].find(chord => chord.suffix === params.suffix)
  return (
    <div className='Variations'>
      <Helmet
        htmlAttributes={{lang: 'en'}}
        title={`${instrument.main.name} ${params.key.replace('sharp', '#')} ${params.suffix} chords`}
        meta={[
            { name: 'description', content: `Guitar and Ukelele chords database. ${instrument.main.name} ${params.key.replace('sharp', '#')} ${params.suffix} chord variations list.` }
        ]}
      />
      <h1>{instrument.main.name} {params.key.replace('sharp', '#')}<span className='suffix'>{params.suffix}</span> chords <span className='return'>[ <Link to={`/react-chords/${name}/chords/${params.key}`}>return</Link> ]</span></h1>
      {getBlocks(chord.positions).map((block, index1) =>
        <div className='no-margin-top flex-center' key={index1}>
          {block.map((position, index2) =>
            <div key={index2} className='Chord unit-1-3 site-box text-center'>
              <Link to={`/react-chords/${params.instrument}/chords/${chord.key.replace('#', 'sharp')}/${chord.suffix}/${index2 + 1 + index1 * 3}`} key={chord.suffix} className='Chord'>
                <h2>Variation {index2 + 1 + index1 * 3}</h2>
                <Chord key={index1} chord={chord} instrument={instrument.main} version={index2 + index1 * 3 + 1} />
              </Link>
              <Play chord={position.midi} />
            </div>
          )}
        </div>
      )}
    </div>)
}

Variations.propTypes = {
  params: React.PropTypes.object
}

export default Variations

