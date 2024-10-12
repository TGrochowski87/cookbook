﻿using Cookbook.Features.Common.Models;
using CSharpFunctionalExtensions;

namespace Cookbook.Features.ShoppingLists;

internal record ShoppingSublist(int Id, string Name, Maybe<int?> RecipeId, decimal Count, List<QuantifiableItemGet> Items);