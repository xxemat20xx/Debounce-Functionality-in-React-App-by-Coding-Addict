import React from 'react'

export const Cocktail = ({image, name, id, info, glass}) => {
  return (
    <article>
        <div>
            <img src={image} alt={name} style={{width:"50px"}}/>
            <div>
                <h3>{name}</h3>
                <h4>{glass}</h4>
                <p>{info}</p>
            </div>
        </div>
    </article>
  )
}
