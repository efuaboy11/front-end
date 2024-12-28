import '../../src/css/componentCss/spin.css'


export const LoadingSpiner = () =>{
  return(
    <div>
      <section className="overlay-background">
        <div className="spinner-container">
          <div className="spinner-content">
            <div className="spinner-sub-container">
              <div class="spinner"></div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}


export const ProcessingSpiner = () =>{
  return(
    <div>
        <div className="spinner-container">
          <div className="spinner-content">
            <div className="spinner-sub-container">
              <div class="spinner"></div>
            </div>
            <p className='md-text text-center light-text'>Processing...</p>
          </div>
        </div>

    </div>
  )
}