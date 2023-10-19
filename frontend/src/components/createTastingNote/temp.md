<section className='formContainer'>
        <h1>Create A Tasting Note</h1>
        <form onSubmit={handleSubmit}>
          {/* Style */}
          <label>
            Style:
            <select name="style" value={formData.style} onChange={handleChange}>
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="rose">Rose</option>
              <option value="sparkling">Sparkling</option>
              <option value="fortified">Fortified</option>
            </select>
          </label>

          {/* Vintage */}
          <label>
            Vintage:
            <input
              type="number"
              name="vintage"
              value={formData.vintage}
              onChange={handleChange}
              disabled={isNonVintage}
            />
          </label>
          <label>
            Non-vintage:
            <input
              type="checkbox"
              checked={isNonVintage}
              onChange={handleCheckboxChange}
            />
          </label>

          {/* Varietal */}
          <label>
            Varietal:
            <input
              type="text"
              name="varietal"
              value={formData.varietal}
              onChange={handleChange}
            />
          </label>

          {/* Blend */}
          <label>
            Blend:
            <input
              type="text"
              name="blend"
              value={formData.blend}
              onChange={handleChange}
            />
          </label>

          {/* Location */}
          <label>
            Geographical Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          {/* Elevation */}
          <label>
            Elevation:
            <input
              type="number"
              name="elevation"
              value={formData.elevation}
              onChange={handleChange}
            />
          </label>

          {/* Vineyard */}
          <label>
            Vineyard:
            <select name="vineyard" value={formData.vineyard} onChange={handleChange}>
              <option value="dryFarmed">Dry Farmed</option>
              <option value="irrigated">Irrigated</option>
            </select>
          </label>

          {/* Palate Notes */}
          <label>
            Palate Notes:
            <input
              type="text"
              name="palateNotes"
              value={formData.palateNotes}
              onChange={handleChange}
            />
          </label>

          {/* Nose Notes */}
          <label>
            Nose Notes:
            <input
              type="text"
              name="noseNotes"
              value={formData.noseNotes}
              onChange={handleChange}
            />
          </label>

          {/* Food Pairings */}
          <label>
            Food Pairings:
            <select name="foodPairings" value={formData.foodPairings} onChange={handleChange}>
              <option value="included">Included</option>
              <option value="notIncluded">Not Included</option>
            </select>
          </label>

          {/* Length */}
          <label>
            Desired Length:
            <select name="length" value={formData.length} onChange={handleChange}>
              <option value="1">1 Sentence</option>
              <option value="2">2 Sentence</option>
              <option value="3">3 Sentence</option>
              <option value="4">4 Sentence</option>
              <option value="5">5 Sentence</option>
              <option value="6">6 Sentence</option>
              <option value="7">7 Sentences</option>
              <option value="8">8 Sentence</option>
              <option value="9">9 Sentence</option>
              {/* Add more lengths if needed */}
            </select>
          </label>

          {/* Writing Style */}
          <label>
            Desired Writing Style:
            <select name="writingStyle" value={formData.writingStyle} onChange={handleChange}>
              <option value="classic">Classic</option>
              <option value="humorous">Humorous</option>
              <option value="story">Tells A Story</option>
            </select>
          </label>

          <button type="submit">Submit</button>
        </form>
      </section>
