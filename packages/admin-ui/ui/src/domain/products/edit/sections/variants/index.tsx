import { Product, ProductVariant } from "@medusajs/medusa"
import { useState } from "react"
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon"
import GearIcon from "../../../../../components/fundamentals/icons/gear-icon"
import PlusIcon from "../../../../../components/fundamentals/icons/plus-icon"
import { ActionType } from "../../../../../components/molecules/actionables"
import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import useEditProductActions from "../../hooks/use-edit-product-actions"
import AddVariantModal from "./add-variant-modal"
import EditVariantInventoryModal from "./edit-variant-inventory-modal"
import EditVariantModal from "./edit-variant-modal"
import EditVariantsModal from "./edit-variants-modal"
import OptionsModal from "./options-modal"
import OptionsProvider, { useOptionsContext } from "./options-provider"
import VariantsTable from "./table"

type Props = {
  product: Product
}

const VariantsSection = ({ product }: Props) => {
  const [variantToEdit, setVariantToEdit] = useState<
    | {
        base: ProductVariant
        isDuplicate: boolean
      }
    | undefined
  >(undefined)

  const [variantInventoryToEdit, setVariantInventoryToEdit] = useState<
    { base: ProductVariant } | undefined
  >(undefined)

  const {
    state: optionState,
    close: closeOptions,
    toggle: toggleOptions,
  } = useToggleState()

  const {
    state: addVariantState,
    close: closeAddVariant,
    toggle: toggleAddVariant,
  } = useToggleState()

  const {
    state: editVariantsState,
    close: closeEditVariants,
    toggle: toggleEditVariants,
  } = useToggleState()

  const actions: ActionType[] = [
    {
      label: "Add Variant",
      onClick: toggleAddVariant,
      icon: <PlusIcon size="20" />,
    },
    {
      label: "Edit Variants",
      onClick: toggleEditVariants,
      icon: <EditIcon size="20" />,
    },
    {
      label: "Edit Options",
      onClick: toggleOptions,
      icon: <GearIcon size="20" />,
    },
  ]

  const { onDeleteVariant } = useEditProductActions(product.id)

  const handleDeleteVariant = (variantId: string) => {
    onDeleteVariant(variantId)
  }

  const handleEditVariant = (variant: ProductVariant) => {
    setVariantToEdit({ base: variant, isDuplicate: false })
  }

  const handleDuplicateVariant = (variant: ProductVariant) => {
    // @ts-ignore
    setVariantToEdit({ base: { ...variant, options: [] }, isDuplicate: true })
  }

  const handleEditVariantInventory = (variant: ProductVariant) => {
    setVariantInventoryToEdit({ base: variant })
  }

  return (
    <OptionsProvider product={product}>
      <Section title="Variants" actions={actions}>
        <ProductOptions />
        <div className="mt-xlarge">
          <h2 className="inter-large-semibold mb-base">
            Product variants{" "}
            <span className="inter-large-regular text-grey-50">
              ({product.variants.length})
            </span>
          </h2>
          <VariantsTable
            variants={product.variants}
            actions={{
              deleteVariant: handleDeleteVariant,
              updateVariant: handleEditVariant,
              duplicateVariant: handleDuplicateVariant,
              updateVariantInventory: handleEditVariantInventory,
            }}
          />
        </div>
      </Section>
      <OptionsModal
        open={optionState}
        onClose={closeOptions}
        product={product}
      />
      <AddVariantModal
        open={addVariantState}
        onClose={closeAddVariant}
        product={product}
      />
      <EditVariantsModal
        open={editVariantsState}
        onClose={closeEditVariants}
        product={product}
      />
      {variantToEdit && (
        <EditVariantModal
          variant={variantToEdit.base}
          isDuplicate={variantToEdit.isDuplicate}
          product={product}
          onClose={() => setVariantToEdit(undefined)}
        />
      )}
      {variantInventoryToEdit && (
        <EditVariantInventoryModal
          variant={variantInventoryToEdit.base}
          product={product}
          onClose={() => setVariantInventoryToEdit(undefined)}
        />
      )}
    </OptionsProvider>
  )
}

const ProductOptions = () => {
  const { options, status } = useOptionsContext()

  if (status === "error") {
    return null
  }

  if (status === "loading" || !options) {
    return (
      <div className="grid grid-cols-3 mt-base gap-x-8">
        {Array.from(Array(2)).map((_, i) => {
          return (
            <div key={i}>
              <div className="h-6 mb-xsmall bg-grey-30 w-9 animate-pulse"></div>
              <ul className="flex flex-wrap items-center gap-1">
                {Array.from(Array(3)).map((_, j) => (
                  <li key={j}>
                    <div className="w-12 h-8 rounded-rounded bg-grey-10 text-grey-50 animate-pulse">
                      {j}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-8 mt-base">
      {options.map((option) => {
        return (
          <div key={option.id}>
            <h3 className="inter-base-semibold mb-xsmall">{option.title}</h3>
            <ul className="flex flex-wrap items-center gap-1">
              {option.values
                ?.map((val) => val.value)
                .filter((v, index, self) => self.indexOf(v) === index)
                .map((v, i) => (
                  <li key={i}>
                    <div className="inter-small-semibold rounded-rounded bg-grey-10 text-grey-50 whitespace-nowrap px-3 py-[6px]">
                      {v}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default VariantsSection
