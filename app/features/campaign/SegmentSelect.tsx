import React from 'react'
import { Button, MenuItem, Tooltip } from '@blueprintjs/core'
import type { ItemPredicate } from '@blueprintjs/select'
import { ItemRenderer, MultiSelect } from '@blueprintjs/select'

interface ISegment {
    id: String;
    name: String
}

interface PropsType {
  segment: ISegment,
  onChange: (segment: ISegment) => void,
  allSegments: ISegment[],
  selectedSegments: ISegment[]
}


const TemplateSelect = MultiSelect.ofType<ISegment>()

const filterSegmentTemplates: ItemPredicate<ISegment> = (query, segment, _index, exactMatch) => {
  const normalizedName = segment.name.toLocaleLowerCase()
  const normalizedQuery = query.toLocaleLowerCase()
  return exactMatch ? normalizedName === normalizedQuery : normalizedName.indexOf(normalizedQuery) >= 0
}

const tagRenderer = (segment: ISegment) => segment.name

class SegmentSelect extends React.Component<PropsType> {
  renderSegmentTemplate: ItemRenderer<ISegment> = (segment, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const menuItem = <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      icon={this.isSegmentSelected(segment) ? "tick" : "blank"}
      key={segment.id}
      onClick={handleClick}
      shouldDismissPopover={false}
      text={`${segment.name}`}
      />
    return modifiers.disabled ? <div key={segment.id}><Tooltip content='Adding this would create a cyclic dependency.'>
        {menuItem}
      </Tooltip></div>
      : menuItem
  }

  handleTagRemove = (_tag: string, index: number) => {
    const { segment, onChange, selectedSegments } = this.props
    const selectedSegment = selectedSegments[index];
    onChange(selectedSegments.filter((segment)=>segment.id!==selectedSegment.id));
  }

  handleClearSuccs = () => {
    onChange([]);
  }


  render () {
    const { segment, allSegments, selectedSegments } = this.props

    const clearButton = selectedSegments.length >0?
      <Button icon="cross" minimal={true} onClick={this.handleClearSuccs} />:undefined;

    return <TemplateSelect
      noResults={<MenuItem disabled={true} text="No results." />}
      items={allSegments}
      itemRenderer={this.renderSegmentTemplate}
      tagRenderer={tagRenderer}
      tagInputProps={{
        onRemove: this.handleTagRemove,
        rightElement: clearButton
      }}
      fill={true}
      selectedItems={selectedSegments}
      onItemSelect={this.handleSuccTaskSelect}
      popoverProps={{ minimal: true }}
      resetOnSelect
    />
  }

    getSelectedSegmentIndex(segment: ISegment) {
        return this.props.selectedSegments.map(s=>s.id).indexOf(segment.id);
    }

    isSegmentSelected(segment: ISegment) {
        return this.getSelectedSegmentIndex(segment) !== -1;
    }


  handleSuccTaskSelect = (selectedSegment: ISegment) => {
    const { selectedSegments,allSegments, onChange } = this.props
    if (!this.isSegmentSelected(selectedSegment)) {
            onChange([...selectedSegments,selectedSegment]);
    }
  }
}

export default SegmentSelect