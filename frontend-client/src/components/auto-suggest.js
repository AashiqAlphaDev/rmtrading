import React from "react"
import AutoSuggest from 'react-autosuggest';
import {
	TextField,
	MenuItem,
	Paper
} from "@material-ui/core";
import InputContainer from "./input"
import parse from "autosuggest-highlight/parse/index";
import match from "autosuggest-highlight/match/index";
import withStyles from "@material-ui/core/styles/withStyles";

function renderSuggestion(suggestion, {query, isHighlighted}) {
	const matches = match(suggestion.name, query);
	const parts = parse(suggestion.name, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </span>
					) : (
						<strong key={String(index)} style={{fontWeight: 500}}>
							{part.text}
						</strong>
					);
				})}
			</div>
		</MenuItem>
	);
}

function renderSuggestionsContainer(options) {
	const {containerProps, children} = options;
	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

export default withStyles((theme)=>{
	return {
		suggestionsContainerOpen:{
			position: 'absolute',
			zIndex: 1,
			marginTop: theme.spacing.unit,
			left: 0,
			right: 0,
		},
		suggestion: {
			display: 'block',
		},
		suggestionsList: {
			margin: 0,
			padding: 0,
			listStyleType: 'none',
		},
		autoSuggest: {
			flexGrow: 1,
			position: 'relative',
		}
	};
})(
	class extends React.Component {
		render() {
			const {classes} = this.props;
			return <InputContainer label={this.props.placeholder}>
				<AutoSuggest
					theme={{
						container: classes.autoSuggest,
						suggestionsContainerOpen: classes.suggestionsContainerOpen,
						suggestionsList: classes.suggestionsList,
						suggestion: classes.suggestion,
					}}
					suggestions={this.props.suggestions}
					onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
					getSuggestionValue={(suggestion) => {
						return suggestion;
					}}
					renderSuggestionsContainer={renderSuggestionsContainer}
					renderInputComponent={(inputProps) => {
						const {InputProps, ref, classes, ...other} = inputProps;
						return <div>
								<TextField
									fullWidth
									InputProps={{
										classes: {
											input: classes.input,
										},
										inputRef: ref,
										...InputProps,
									}}
									{...other}
								/>
							</div>
					}}
					renderSuggestion={renderSuggestion}
					inputProps={{
						classes,
						placeholder: this.props.placeholder,
						value: this.props.value,
						onChange: this.props.onChange,
					}}
				/>
			</InputContainer>
		}
	}
)