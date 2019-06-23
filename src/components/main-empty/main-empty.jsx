import React from 'react';

const EmptyMainPage = () => {
  // const defaultCities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
  return (
    <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
          </div>
        </section>
        <div className="cities__right-section">
        </div>
      </div>
    </div>
  );
};

// const EmptyMainPage = () => {
//   const defaultCities = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
//   return <React.Fragment>
//     <main className="page__main page__main--index page__main--index-empty">
//       <h1 className="visually-hidden">Cities</h1>
//       <div className="cities tabs">
//         <section className="locations container">
//           <ul className="locations__list tabs__list">
//             {defaultCities.map((city) => (
//               <li className="locations__item" key={city}>
//                 <a className="locations__item-link tabs__item" href="#">
//                   <span>{city}</span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//       <div className="cities__places-wrapper">
//         <div className="cities__places-container cities__places-container--empty container">
//           <section className="cities__no-places">
//             <div className="cities__status-wrapper tabs__content">
//               <b className="cities__status">No places to stay available</b>
//               <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
//             </div>
//           </section>
//           <div className="cities__right-section">
//           </div>
//         </div>
//       </div>
//     </main>
//   </React.Fragment>;
// };

export default EmptyMainPage;
