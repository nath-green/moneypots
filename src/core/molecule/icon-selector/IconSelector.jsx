import React from 'react';
import { Input, IconCard, Overlay } from '../../atom';
import { allIcons } from '../../constants';

/*

Install ionicons for react so they can be removed from index.html

*/

export class IconSelector extends React.Component {
  state = {
    iconName: '',
    selectedIcon: this.props.selectedIcon,
    icons: allIcons,
    filteredIcons: [],
    overlayOpen: false
  };

  noResults = <p className="c-text-body">So much empty.</p>;

  componentDidMount() {
    const { icons } = this.state;
    this.setState({
      filteredIcons: icons
    });
  }

  componentWillReceiveProps(nextProps) {
    const { selectedIcon } = this.props;
    if (nextProps.selectedIcon !== selectedIcon) {
      this.setState({ selectedIcon: nextProps.selectedIcon });
    }
  }

  handleSearch = event => {
    const { icons } = this.state;
    const iconName = event.target.value;

    this.setState({
      iconName
    });

    if (iconName !== '') {
      this.setState(() => ({
        filteredIcons: icons.filter(icon => icon.includes(iconName.toLowerCase()))
      }));
    } else {
      this.setState(() => ({
        filteredIcons: icons
      }));
    }
  };

  selectIcon = selectedIcon => {
    const { selectIcon } = this.props;
    this.setState({ selectedIcon });
    selectIcon(selectedIcon);
    this.closeOverlay();
  };

  openOverlay = () => {
    document.body.classList.add('overlay-open');
    this.setState({ overlayOpen: true });
  };

  closeOverlay = () => {
    document.body.classList.remove('overlay-open');
    const { icons } = this.state;
    this.setState({ overlayOpen: false, iconName: '', filteredIcons: icons });
  };

  render() {
    const { selectedIcon, filteredIcons, iconName, overlayOpen } = this.state;
    const iconList = filteredIcons.map(icon => (
      <IconCard
        icon={icon}
        onClick={() => this.selectIcon(icon)}
        selected={icon === selectedIcon}
      />
    ));

    if (!overlayOpen) {
      const { cardClassName } = this.props;
      return (
        <IconCard
          className={cardClassName}
          icon={selectedIcon}
          onClick={this.openOverlay}
          selectable
        />
      );
    }

    return (
      <Overlay open={overlayOpen} onClose={this.closeOverlay} scrollable={false}>
        <div className="c-icon-selector">
          <div className="c-icon-selector__search">
            <Input
              value={iconName}
              id="iconName"
              type="text"
              onChange={event => this.handleSearch(event)}
              placeholder="Search"
              className="u-margin-bottom"
            />
          </div>
          <div className="c-icon-selector__icons">
            {filteredIcons.length > 0 ? iconList : this.noResults}
          </div>
        </div>
      </Overlay>
    );
  }
}
