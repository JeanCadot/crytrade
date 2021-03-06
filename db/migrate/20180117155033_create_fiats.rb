class CreateFiats < ActiveRecord::Migration[5.1]
  def change
    create_table :fiats do |t|
      t.string :name
      t.string :symbol
      t.decimal :price_usd, precision: 15, scale: 7

      t.timestamps
    end
  end
end
