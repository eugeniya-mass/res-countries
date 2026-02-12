import React from 'react';
import AppTheme from '../../AppTheme';
import './Info.scss';

function Info({ theme, data }) {
  const currentTheme = AppTheme[theme];

  const {
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies = [],
    languages = [],
    borders = [],
    } = data || {};

    const currencyName = currencies?.[0]?.name ?? '—';

  return (
      <div className="info" style={{ color: currentTheme.textColor }}>
          <div className="info__box">
              <div className="image" style={{ backgroundImage: `url(${flag || ''})` }} />

              <div className="left-column">
                  <div className="title">{name || '—'}</div>

                  <div className="row">
                      <div className="col">
                          <div><span className="name">Native name: </span>{nativeName || '—'}</div>
                          <div><span className="name">Population: </span>{population ?? '—'}</div>
                          <div><span className="name">Region: </span>{region || '—'}</div>
                          <div><span className="name">Sub Region: </span>{subregion || '—'}</div>
                          <div><span className="name">Capital: </span>{capital || '—'}</div>
                      </div>

                      <div className="col">
                          <div><span className="name">Top Level Domain: </span>{topLevelDomain || '—'}</div>
                          <div><span className="name">Currencies: </span>{currencyName}</div>

                          <div>
                              <span className="name">Languages: </span>
                              {languages.length
                                  ? languages.map((lang, index) => (
                                      <span key={lang?.iso639_1 || lang?.name || index}>
                        {lang?.name || '—'}
                                          {languages.length - 1 === index ? '' : ', '}
                      </span>
                                  ))
                                  : '—'}
                          </div>
                      </div>
                  </div>

                  {borders.length > 0 && (
                      <div className="border-countries">
                          <div className="name">Border Countries: </div>
                          {borders.map((bord, index) => (
                              <div
                                  key={bord || index}
                                  style={{
                                      backgroundColor: currentTheme.backgroundColor,
                                      boxShadow: currentTheme.boxShadow,
                                      color: currentTheme.textColor
                                  }}
                                  className="tag"
                              >
                                  {bord}
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
}

export default Info;