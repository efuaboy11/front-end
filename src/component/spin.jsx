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